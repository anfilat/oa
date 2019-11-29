package search

import "math/rand"

// статистики считаются от 1, а элементы массива с 0. Приводим первое ко второму
func RSelect(array []float64, k int) float64 {
	return rSelect(array, k-1)
}

func rSelect(array []float64, k int) float64 {
	for {
		if len(array) == 1 {
			return array[0]
		}

		pivotIndex := rand.Intn(len(array))
		pivotIndex = rPartition(array, pivotIndex, k)

		if pivotIndex == k {
			return array[pivotIndex]
		} else if pivotIndex > k {
			array = array[:pivotIndex]
		} else {
			array = array[pivotIndex+1:]
			k -= pivotIndex + 1
		}
	}
}

func rPartition(array []float64, pivotIndex int, k int) int {
	pivotValue := array[pivotIndex]
	right := len(array) - 1

	array[pivotIndex], array[right] = array[right], array[pivotIndex]

	storeIndex := 0
	for i := 0; i < right; i++ {
		if array[i] < pivotValue {
			array[storeIndex], array[i] = array[i], array[storeIndex]
			storeIndex++
		}
	}

	storeIndexEq := storeIndex
	for i := storeIndex; i < right; i++ {
		if array[i] == pivotValue {
			array[storeIndexEq], array[i] = array[i], array[storeIndexEq]
			storeIndexEq++
		}
	}

	array[right], array[storeIndexEq] = array[storeIndexEq], array[right]

	if k < storeIndex {
		return storeIndex
	}
	if k <= storeIndexEq {
		return k
	}
	return storeIndexEq
}
