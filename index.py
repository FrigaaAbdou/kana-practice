import random

# Hiragana dictionary: keys are hiragana, values are their sounds
hiragana_dict = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n"
}

def guess_hiragana():
    score = 0
    attempts = 0

    print("Welcome to the Hiragana Guessing Game!")
    print("Type 'exit' to quit at any time.")
    
    while True:
        # Select a random hiragana
        hiragana, sound = random.choice(list(hiragana_dict.items()))
        print(f"\nWhat is the sound of this hiragana: {hiragana}?")
        
        # Get user input
        user_input = input("Your answer: ").strip().lower()
        if user_input == "exit":
            break

        attempts += 1
        if user_input == sound:
            print("Correct! Great job!")
            score += 1
        else:
            print(f"Incorrect. The correct sound is '{sound}'.")

        print(f"Score: {score}/{attempts}")

    print("\nThanks for playing!")
    print(f"Your final score: {score}/{attempts}")

# Run the game
if __name__ == "__main__":
    guess_hiragana()
