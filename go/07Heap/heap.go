package heap

func Heap(array []float64) []float64 {
	swap := func(i, j int) {
		t := array[i]
		array[i] = array[j]
		array[j] = t
	}

	down := func(size, root int) {
		for {
			// левый потомок
			child := (root << 1) + 1
			if child >= size {
				return
			}
			childValue := array[child]

			// правый потомок
			right := child + 1
			if right < size && childValue < array[right] {
				child = right
				childValue = array[right]
			}

			// сравнение корня с потомками
			rootValue := array[root]
			if rootValue >= childValue {
				return
			}

			// делаем инлайн свопа за компилятор
			array[root] = childValue
			array[child] = rootValue
			root = child
		}
	}

	n := len(array)

	for node := n/2 - 1; node >= 0; node-- {
		down(n, node)
	}

	for size := n - 1; size > 0; size-- {
		swap(0, size)
		down(size, 0)
	}

	return array
}
