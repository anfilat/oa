package search

import "math"

// https://en.wikipedia.org/wiki/Median_of_medians

// статистики считаются от 1, а элементы массива с 0. Приводим первое ко второму
func DSelect(array []float64, k int) float64 {
	return array[dSelect(array, 0, len(array)-1, k-1)]
}

func dSelect(list []float64, left int, right int, n int) int {
	for {
		if left == right {
			return left
		}

		pivotIndex := dPivot(list, left, right)
		pivotIndex = dPartition(list, left, right, pivotIndex, n)

		if n == pivotIndex {
			return n
		} else if n < pivotIndex {
			right = pivotIndex - 1
		} else {
			left = pivotIndex + 1
		}
	}
}

// three-way partition
func dPartition(list []float64, left int, right int, pivotIndex int, n int) int {
	pivotValue := list[pivotIndex]
	list[pivotIndex], list[right] = list[right], list[pivotIndex] // Move pivot to end
	storeIndex := left
	//Move all elements smaller than the pivot to the left of the pivot
	for i := left; i <= right-1; i++ {
		if list[i] < pivotValue {
			list[storeIndex], list[i] = list[i], list[storeIndex]
			storeIndex++
		}
	}
	//Move all elements equal to the pivot right after the smaller elements
	storeIndexEq := storeIndex
	for i := storeIndex; i <= right-1; i++ {
		if list[i] == pivotValue {
			list[storeIndexEq], list[i] = list[i], list[storeIndexEq]
			storeIndexEq++
		}
	}
	list[right], list[storeIndexEq] = list[storeIndexEq], list[right] // Move pivot to its final place
	//Return location of pivot considering the desired location n
	if n < storeIndex {
		return storeIndex // n is in the group of smaller elements
	}
	if n <= storeIndexEq {
		return n // n is in the group equal to pivot
	}
	return storeIndexEq // n is in the group of larger elements
}

func dPivot(list []float64, left int, right int) int {
	// for 5 or less elements just get median
	if right-left < 5 {
		return partition5(list, left, right)
	}
	// otherwise move the medians of five-element subgroups to the first n/5 positions
	for i := left; i <= right; i += 5 {
		// get the median position of the i'th five-element subgroup
		subRight := i + 4
		if subRight > right {
			subRight = right
		}
		median5 := partition5(list, i, subRight)
		ind := left + int(math.Floor(float64(i-left)/5))
		list[median5], list[ind] = list[ind], list[median5]
	}

	// compute the median of the n/5 medians-of-five
	mid := (right-left)/10 + left + 1
	return dSelect(list, left, left+int(math.Floor(float64(right-left)/5)), mid)
}

// insertion sort
func partition5(list []float64, left int, right int) int {
	for i := left + 1; i <= right; i++ {
		for j := i; j > left && list[j-1] > list[j]; j-- {
			list[j-1], list[j] = list[j], list[j-1]
		}
	}

	return (left + right) >> 1
}
