// Function to find the minimum cost of connecting ropes
function minCostOfRopes(ropes) {
  // Initialize a priority queue (min-heap)
  const minHeap = new MinHeap();

  // Insert all the ropes into the min-heap
  for (let i = 0; i < ropes.length; i++) {
    minHeap.insert(ropes[i]);
  }

  let totalCost = 0;

  // Merge ropes until there is only one rope left in the heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the min-heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of connecting the two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the merged rope back into the min-heap
    minHeap.insert(cost);
  }

  return totalCost;
}

// Define the MinHeap class
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return minValue;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    const length = this.heap.length;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (currentIndex === smallestIndex) {
        break;
      }

      this.swap(currentIndex, smallestIndex);
      currentIndex = smallestIndex;
    }
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

// Get the input from the user
const inputElement = document.getElementById("input");
const resultElement = document.getElementById("result");

inputElement.addEventListener("input", () => {
  const inputText = inputElement.value;
  const ropes = inputText.split(",").map((rope) => parseInt(rope.trim()));
  const minCost = minCostOfRopes(ropes);
  resultElement.textContent = minCost.toString();
});
