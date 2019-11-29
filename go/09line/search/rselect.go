package search

import "math/rand"

// статистики считаются от 1, а элементы массива с 0. Приводим первое ко второму
func RSelect(array []float64, k int) float64 {
	return rSelect(array, k-1)
}

func rSelect(array []float64, k int) float64 {
	if len(array) == 1 {
		return array[0]
	}

	pivotIndex := rand.Intn(len(array))
	pivotIndex = rPartition(array, pivotIndex)

	if pivotIndex == k {
		return array[pivotIndex]
	} else if pivotIndex > k {
		return rSelect(array[:pivotIndex], k)
	} else {
		return rSelect(array[pivotIndex+1:], k-pivotIndex-1)
	}
}

func rPartition(array []float64, pivotIndex int) int {
	array[0], array[pivotIndex] = array[pivotIndex], array[0]

	p := array[0]
	i := 1
	for j := 1; j < len(array); j++ {
		if array[j] < p {
			array[i], array[j] = array[j], array[i]
			i++
		}
	}

	array[0], array[i-1] = array[i-1], array[0]

	return i - 1
}
