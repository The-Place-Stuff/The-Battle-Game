export default class Random {
    private readonly randomNumberGenerator: () => number

    public constructor(seed: number) {
        this.randomNumberGenerator = Random.createSeededRandom(seed)
    }

    private static createSeededRandom(seed: number) {
        return () => {
            let t = seed += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

    public next(): number {
        return this.randomNumberGenerator()
    }

    public nextInt(bound: number = 1): number {
        return Math.floor(this.randomNumberGenerator() * bound)
    }

    public nextBoolean(): boolean {
        return this.nextInt() == 1
    }
}