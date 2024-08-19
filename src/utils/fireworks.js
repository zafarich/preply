import { Fireworks } from 'fireworks-js'
// import { useMainStore } from 'src/stores/main'

export function animateFireWorks(container) {
    const fireworks = new Fireworks(container, {
        speed: 6,
        acceleration: 1.0,
    })

    fireworks.start()
    setTimeout(() => {
        fireworks.stop()
        useMainStore().changeFireWorks(false)
    }, 3000)
}
