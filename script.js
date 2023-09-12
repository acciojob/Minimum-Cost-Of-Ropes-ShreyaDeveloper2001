function calculateMinCost() {
  //your code here
  // Get the input string from the HTML input element
  const inputElement = document.getElementById("ropesInput");
  const inputString = inputElement.value;

  // Split the input string into an array of rope lengths
  const ropeLengths = inputString.split(',').map(str => parseInt(str.trim(), 10));

  // Function to calculate the minimum cost of connecting ropes
  function minCostOfRopes(arr) {
    // Create a min-heap using a priority queue
    const minHeap = new MinHeap();

    // Add all the rope lengths to the min-heap
    for (const rope of arr) {
      minHeap.insert(rope);
    }

    let totalCost = 0;

    // Connect ropes until there is only one rope left in the min-heap
    while (minHeap.size() > 1) {
      // Extract the two smallest ropes from the min-heap
      const firstMin = minHeap.extractMin();
      const secondMin = minHeap.extractMin();

      // Calculate the cost of connecting these two ropes
      const cost = firstMin + secondMin;

      // Add the cost to the total cost
      totalCost += cost;

      // Insert the combined rope length back into the min-heap
      minHeap.insert(cost);
    }

    return totalCost;
  }

  // Calculate the minimum cost
  const minCost = minCostOfRopes(ropeLengths);

  // Display the minimum cost in the result div
  const resultElement = document.getElementById("result");
  resultElement.textContent = `Minimum Cost: ${minCost}`;
}

  
  
  
}  
