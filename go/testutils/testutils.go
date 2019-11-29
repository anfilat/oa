package testutils

import (
	"math/rand"
	"time"
)

func Bench(fn func()) time.Duration {
	start := time.Now()
	fn()
	return time.Since(start)
}

func RandomArray(n int) []float64 {
	randomSource := rand.NewSource(time.Now().UnixNano())
	random := rand.New(randomSource)

	data := make([]float64, n)
	for i := 0; i < len(data); i++ {
		data[i] = random.Float64()
	}

	return data
}

func ConstantArray(n int, value float64) []float64 {
	data := make([]float64, n)
	for i := 0; i < len(data); i++ {
		data[i] = value
	}

	return data
}

func Shuffle(arr []float64, n int) {
	randomSource := rand.NewSource(time.Now().UnixNano())
	random := rand.New(randomSource)

	indexes := make(map[int]bool)
	for len(indexes) < n {
		indexes[random.Intn(len(arr))] = true
	}

	var index int
	var value float64

	for k := range indexes {
		index = k
		value = arr[index]
		break
	}
	delete(indexes, index)

	for k := range indexes {
		arr[index] = arr[k]
		index = k
	}
	arr[index] = value
}

func CopyArray(arr []float64) []float64 {
	result := make([]float64, len(arr))
	copy(result, arr)
	return result
}
