def score(dice)
    counts = Hash.new(0)

    dice.each do |die|
        counts[die] += 1
    end

    total = 0

    counts.each do |value, count|
        if count >= 3
            if value == 1
                total += 1000
            else
                total += value * 100
            end
            count -= 3
        end

        if value == 1
            total += count * 100
        elsif value == 5
            total += count * 50
        end

    end
    total
end

puts "Enter number of players: "
number_of_players = gets.to_i

players = Array.new(number_of_players) {0}

puts "Starting the game"

players.each_with_index do |_, index|
    puts "Player #{index + 1} turn"
    dice = Array.new(5) { rand(1..6) }
    turn_score = score(dice)

    puts "Rolled dice: #{dice.inspect}"
    puts "Score this turn: #{turn_score}"

    players[index] += turn_score
end

puts "Final Score"
players.each_with_index do |score, index|
    puts "Player #{index + 1}: #{score}"
end

# max_score = players.max
# winner = players.index(max_score)
# puts "Winner: Player #{winner + 1} with #{max_score}"

max_score = players.max
winner_indexs = players.each_index.select { |i| players[i] == max_score}

if number_of_players < 2
    if winner_indexs.length == 1
        puts "Winner: Player #{winner_indexs.first + 1} with #{max_score}"
    else
        winners = winner_indexs.map { |i| "Player #{i + 1}"}.join(", ")
        puts "It is a tie between #{winners} with #{max_score}"
    end 
else
    puts "Winner: Player #{winner_indexs.first + 1} with #{max_score}"
end