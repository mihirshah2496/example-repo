entry_score = 300   # Minimum score needed to add score to previous score
winning_score = 3000    # Score which once acheived game stops

def score_roll(dice)
  counts = Hash.new(0)  # Creating a Hash
  dice.each { |d| counts[d] += 1 }  # Loop to travel through every value in the dice array

  score = 0
  scoring_dice = 0

  counts.each do |value, count| #   Going through each value
    # Scoring Logic for triples
    if count >= 3
      score += (value == 1 ? 1000 : value * 100)
      count -= 3
      scoring_dice += 3
    end
    # Scoring Logic for singles
    if value == 1
      score += count * 100
      scoring_dice += count
    elsif value == 5
      score += count * 50
      scoring_dice += count
    end
  end
  [score, scoring_dice] # Returning Score and dice that scored
end


print "Enter number of players: "
num_players = gets.to_i # Taking Number of Players Input

players = Array.new(num_players, 0) # Creating array players
turn = 1
game_over = false

while !game_over
  puts "Turn #{turn}:"
  puts "----------"
  players.each_with_index do |total_score, index|
    turn_score = 0
    dice_to_roll = 5
    loop do
        dice = Array.new(dice_to_roll) { rand(1..6) }
        roll_score, scoring_dice = score_roll(dice)
        puts "Player #{index + 1} rolls: #{dice.join(', ')}"

        # Bust
        if roll_score == 0
            puts "Score in this round: 0"
            puts "Total Score: #{players[index]}"
            turn_score = 0
            break
        end

        turn_score += roll_score
        puts "Score in this round: #{turn_score}"
        puts "Total score: #{players[index] + turn_score}"

        non_scoring = dice_to_roll - scoring_dice

        # All dice scored roll all 5 again
        if non_scoring == 0
            dice_to_roll = 5
            next
        end
        print "Do you want to roll the non-scoring #{non_scoring} dice"
        print non_scoring == 1 ? "? (y/n): " : "s? (y/n): "
        choice = gets.chomp.downcase
        break if choice != "y"
        dice_to_roll = non_scoring
        end

        # Entry rule
        if players[index] == 0 && turn_score < entry_score
            turn_score = 0
        end
        players[index] += turn_score

        # Stop game immediately at 3000
        if players[index] >= winning_score
            puts "Player #{index + 1} reached #{players[index]} points"
            puts "Player #{index + 1} wins the game"
            game_over = true
            break
        end
    end
    turn += 1
end