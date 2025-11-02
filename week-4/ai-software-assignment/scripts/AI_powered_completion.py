

# ===== AI-GENERATED VERSION =====
def ai_generated_sort(data, key):
    """
    AI-generated function by GitHub Copilot.
    Sorts a list of dictionaries by a given key.
    """
    
    if not isinstance(data, list):
      raise TypeError("data must be a list of dictionaries")
    # Use .get to avoid KeyError; None values will be placed first
    try:
      return sorted(data, key=lambda item: item.get(key, None))
    except TypeError:
      # If values are not directly comparable (e.g., mixed types), sort by their string repr
      return sorted(data, key=lambda item: str(item.get(key, None)))
    pass


# ===== MANUAL VERSION =====
def manual_sort(data, key):
    """
    Manually written function for sorting.
    """
    return sorted(data, key=lambda x: x[key])
    pass


# ===== SAMPLE TEST =====
if __name__ == "__main__":
    sample_data = [
        {"name": "Alice", "age": 25},
        {"name": "Bob", "age": 20},
        {"name": "Charlie", "age": 30}
    ]

    print("Original:", sample_data)
    print("AI-generated sort:", ai_generated_sort(sample_data.copy(), "age"))
    print("Manual sort:", manual_sort(sample_data.copy(), "age"))
