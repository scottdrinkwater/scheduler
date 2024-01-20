import { describe, it, expect } from "vitest"
import { generate } from '../../src/utils/array';

describe('utils', () => {
    describe('array.ts', () => {
        describe('generate', () => {
            it('generates using keys by default', () => {
                // Arrange / Act
                const array = generate(5)

                // Assert
                expect(array).toEqual([0, 1, 2, 3, 4])
            })

            it('generates using map', () => {
                // Arrange / Act
                const array = generate(5, (_, key) => key + 1)

                // Assert
                expect(array).toEqual([1, 2, 3, 4, 5])
            })
        })
    })
})