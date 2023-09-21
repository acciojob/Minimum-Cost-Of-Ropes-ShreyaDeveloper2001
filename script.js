function calculateMinCost() {
  // Get the input value and split it into an array of rope lengths
  const input = document.getElementById("rope-lengths").value;
  const ropeLengths = input.split(",").map((length) => parseInt(length.trim(), 10));

  // Calculate the minimum cost
  const minimumCost = calculateMinimumCost(ropeLengths);

  // Display the result
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Minimum Cost: ${minimumCost}`;
}

function calculateMinimumCost(ropeLengths) {
  // Use a priority queue (min heap) to efficiently find the two smallest ropes
  const minHeap = new MinHeap(ropeLengths);

  let cost = 0;

  while (minHeap.size() > 1) {
    // Get the two smallest ropes
    const min1 = minHeap.extractMin();
    const min2 = minHeap.extractMin();

    // Calculate the cost and add it to the total
    const currentCost = min1 + min2;
    cost += currentCost;

    // Insert the new rope with combined length back into the heap
    minHeap.insert(currentCost);
  }

  return cost;
}

// MinHeap class to implement the priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIndex = this.size() - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        // Swap the current element with its parent if it's smaller
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
        currentIndex = parentIndex;
      } else {
        // Stop if the current element is greater than or equal to its parent
        break;
      }
    }
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }

    // Swap the root (minimum element) with the last element
    [this.heap[0], this.heap[this.size() - 1]] = [this.heap[this.size() - 1], this.heap[0]];

    // Extract the minimum element
    const minValue = this.heap.pop();

    // Heapify down to maintain the heap property
    this.heapifyDown();

    return minValue;
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      // Find the index of the smallest child
      if (
        leftChildIndex < this.size() &&
        this.heap[leftChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.size() &&
        this.heap[rightChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = rightChildIndex;
      }

      // If the current element is greater than the smallest child, swap them
      if (currentIndex !== smallestChildIndex) {
        [this.heap[currentIndex], this.heap[smallestChildIndex]] = [
          this.heap[smallestChildIndex],
          this.heap[currentIndex],
        ];
        currentIndex = smallestChildIndex;
      } else {
        // Stop if the current element is smaller than or equal to its children
        break;
      }
    }
  }
}
