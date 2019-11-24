package shell

import (
	"fmt"
	"math/rand"
	"runtime"
	"sort"
	"testing"
	"time"
)

func TestShellGap(t *testing.T) {
	array := randomArray(10000)
	Shell(array, ShellGaps)
	if !sort.IsSorted(sort.Float64Slice(array[0:])) {
		t.Error("Shell gaps")
	}
}

func TestKnuthGaps(t *testing.T) {
	array := randomArray(10000)
	Shell(array, KnuthGaps)
	if !sort.IsSorted(sort.Float64Slice(array[0:])) {
		t.Error("Knuth gaps")
	}
}

func TestSedgewickGaps(t *testing.T) {
	array := randomArray(10000)
	Shell(array, SedgewickGaps)
	if !sort.IsSorted(sort.Float64Slice(array[0:])) {
		t.Error("Sedgewick gaps")
	}
}

func TestTokudaGaps(t *testing.T) {
	array := randomArray(10000)
	Shell(array, TokudaGaps)
	if !sort.IsSorted(sort.Float64Slice(array[0:])) {
		t.Error("Tokuda gaps")
	}
}

func TestBench(t *testing.T) {
	size := 5_000_000

	data := randomArray(size)
	array := make([]float64, len(data))

	sorted10p := copyArray(data)
	sort.Slice(sorted10p, func(i, j int) bool { return sorted10p[i] < sorted10p[j] })
	shuffle(sorted10p, size/10)

	sorted5 := copyArray(data)
	sort.Slice(sorted5, func(i, j int) bool { return sorted5[i] < sorted5[j] })
	shuffle(sorted5, 5)
	runtime.GC()

	copy(array, data)
	fmt.Printf("ShellGaps random %s\n", bench(func() { Shell(array, ShellGaps) }))
	copy(array, sorted10p)
	fmt.Printf("ShellGaps sorted10p %s\n", bench(func() { Shell(array, ShellGaps) }))
	copy(array, sorted5)
	fmt.Printf("ShellGaps sorted5 %s\n", bench(func() { Shell(array, ShellGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("KnuthGaps random %s\n", bench(func() { Shell(array, KnuthGaps) }))
	copy(array, sorted10p)
	fmt.Printf("KnuthGaps sorted10p %s\n", bench(func() { Shell(array, KnuthGaps) }))
	copy(array, sorted5)
	fmt.Printf("KnuthGaps sorted5 %s\n", bench(func() { Shell(array, KnuthGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("SedgewickGaps random %s\n", bench(func() { Shell(array, SedgewickGaps) }))
	copy(array, sorted10p)
	fmt.Printf("SedgewickGaps sorted10p %s\n", bench(func() { Shell(array, SedgewickGaps) }))
	copy(array, sorted5)
	fmt.Printf("SedgewickGaps sorted5 %s\n", bench(func() { Shell(array, SedgewickGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("TokudaGaps random %s\n", bench(func() { Shell(array, TokudaGaps) }))
	copy(array, sorted10p)
	fmt.Printf("TokudaGaps sorted10p %s\n", bench(func() { Shell(array, TokudaGaps) }))
	copy(array, sorted5)
	fmt.Printf("TokudaGaps sorted5 %s\n", bench(func() { Shell(array, TokudaGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("system random %s\n", bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
	copy(array, sorted10p)
	fmt.Printf("system sorted10p %s\n", bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
	copy(array, sorted5)
	fmt.Printf("system sorted5 %s\n", bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
}

func bench(fn func()) time.Duration {
	start := time.Now()
	fn()
	return time.Since(start)
}

func randomArray(n int) []float64 {
	randomSource := rand.NewSource(time.Now().UnixNano())
	random := rand.New(randomSource)

	data := make([]float64, n)
	for i := 0; i < len(data); i++ {
		data[i] = random.Float64()
	}

	return data
}

func shuffle(arr []float64, n int) {
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

func copyArray(arr []float64) []float64 {
	result := make([]float64, len(arr))
	copy(result, arr)
	return result
}
