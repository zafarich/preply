<template>
    <div class="firework-container">
        <div v-for="n in explosions" :key="'left-' + n" class="explosion left">
            <div
                v-for="p in particles"
                :key="'left-p-' + p"
                class="particle"
            ></div>
        </div>
        <div
            v-for="n in explosions"
            :key="'right-' + n"
            class="explosion right"
        >
            <div
                v-for="p in particles"
                :key="'right-p-' + p"
                class="particle"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { useMainStore } from 'src/stores/main'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()

const explosions = ref(2) // Количество взрывов
const particles = ref(50) // Количество частиц в каждом взрыве

const { showFireWorks } = storeToRefs(mainStore)

// onMounted(() => {
//     // if (showFireWorks.value) {
//     const leftExplosions = document.querySelectorAll('.explosion.left')
//     const rightExplosions = document.querySelectorAll('.explosion.right')

//     triggerExplosions(leftExplosions, 'left')
//     triggerExplosions(rightExplosions, 'right')
//     // }
// })

watch(
    () => showFireWorks.value,
    () => {
        if (showFireWorks.value) {
            const leftExplosions = document.querySelectorAll('.explosion.left')
            const rightExplosions =
                document.querySelectorAll('.explosion.right')

            triggerExplosions(leftExplosions, 'left')
            triggerExplosions(rightExplosions, 'right')
            if (navigator.vibrate) {
                navigator.vibrate(200)
            }
        }
    },
)

function triggerExplosions(explosions, side) {
    explosions.forEach((explosion, index) => {
        setTimeout(() => {
            explosion.style.opacity = 1
            explosion.querySelectorAll('.particle').forEach((particle) => {
                const angle = Math.random() * 2 * Math.PI
                const distance = Math.random() * 150 + 50
                const x = Math.cos(angle) * distance
                const y = Math.sin(angle) * distance
                const size = Math.random() * 10 + 5 // Размер частиц

                particle.style.transform = `translate(${x}px, ${y}px) scale(${Math.random() + 0.5})`
                particle.style.backgroundColor = getRandomColor()
                particle.style.opacity = 1
                particle.style.width = `${size}px`
                particle.style.height = `${size}px`
                particle.style.clipPath = getRandomShape()
            })
        }, index * 1000)

        setTimeout(
            () => {
                explosion.style.opacity = 0
            },
            index * 1000 + 1000,
        ) // Длительность анимации взрыва
    })
}

function getRandomColor() {
    const colors = [
        '#FF5733',
        '#FFBD33',
        '#75FF33',
        '#33FFBD',
        '#3375FF',
        '#FF33D4',
        '#FF3380',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomShape() {
    const shapes = [
        'circle(50% at 50% 50%)', // Circle
        'polygon(0% 0%, 100% 0%, 50% 100%)', // Triangle
        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond
    ]
    return shapes[Math.floor(Math.random() * shapes.length)]
}
</script>

<style scoped>
.firework-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.explosion {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    transition: opacity 0.5s ease-in;
}

.explosion.left {
    left: 10%;
    top: 50%;
}

.explosion.right {
    right: 10%;
    top: 50%;
}

.particle {
    position: absolute;
    background-color: #ff5733;
    clip-path: circle(50% at 50% 50%);
    opacity: 0;
    transition:
        transform 1.5s ease-out,
        opacity 1.5s ease-out;
}
</style>
