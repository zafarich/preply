import { Fireworks } from 'fireworks-js'
//TODO
// import { useMainStore } from 'src/stores/main'

export function animateFireWorks(container) {
    const fireworks = new Fireworks(container, {
        speed: 6,
        acceleration: 1.0,
        // Assuming these parameters exist in the library
        startPosition: { x: 0.5, y: 180 }, // Start at the bottom-center
        angle: 1, // Fire upwards, 90 degrees from the horizontal
        spread: 180, // Spread the fireworks across 180 degrees (left and right)
        colors: ['#ff0000', '#00ff00', '#0000ff'], // Example colors
        maxRockets: 5, // Number of rockets at once
        rocketSpawnInterval: 150, // Milliseconds between rockets
    })

    fireworks.start()
    setTimeout(() => {
        fireworks.stop()
        useMainStore().changeFireWorks(false)
    }, 3000)
}
