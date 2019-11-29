package search

import (
	"sort"
)

func SelectBySort(array []float64, k int) float64 {
	sort.Slice(array, func(i, j int) bool { return array[i] < array[j] })
	return array[k-1]
}

func SelectMin(array []float64) float64 {
	min := array[0]
	for _, x := range array {
		if x < min {
			min = x
		}
	}
	return min
}
