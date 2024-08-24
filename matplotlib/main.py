import matplotlib.pyplot as plt

# Sample data
x = [0, 1, 2, 3, 4, 5]
y = [0, 1, 4, 9, 16, 25]

# Create a plot
plt.plot(x, y, label='Quadratic Growth', color='blue', marker='o')

# Add a title
plt.title('Basic Line Plot Example')

# Add x and y labels
plt.xlabel('X-axis')
plt.ylabel('Y-axis')

# Add a legend
plt.legend()

# Display the plot
plt.show()
