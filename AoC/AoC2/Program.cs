using System.ComponentModel;
using System.Reflection;
using System.Text.RegularExpressions;
using AoC2.Properties;
using static System.Net.Mime.MediaTypeNames;

namespace AoC2
{
    public record Game(int id, int red, int green, int blue);

    public class Solution
    {
        public int PartOne(string[] input)
        {
            int sum = 0;
            foreach (var line in input){
                var game = ParseGame(line);
                if(game.red <= 12 && game.green <= 13 &&  game.blue <= 14)
                    sum += game.id;
            
            }
            return sum;
        }


        public int PartTwo(string[] input)
        {
            int sum = 0;
            foreach (var line in input)
            {
                var game = ParseGame(line);
                sum += game.red * game.green * game.blue;
            }
            return sum;
        }
        

        IEnumerable<int> ParseInts(string line, string rx)
        {
            var matches = Regex.Matches(line, rx);
            List<int> result = new List<int>();
            foreach(Match match in matches)
            {
                result.Add(int.Parse(match.Groups[1].Value));
            }
            return result;
        }

        Game ParseGame(string line) =>
            new Game(
                    ParseInts(line, "(\\d+)").First(),
                    ParseInts(line, "(\\d+) red").Max(),
                    ParseInts(line, "(\\d+) green").Max(),
                    ParseInts(line, "(\\d+) blue").Max()
                );
    }

    public class SolutionOld
    {
        public object PartOne() =>
            Solve(12, 13, 14, "Game (?<GameId>\\d+): ");

        public object PartTwo() =>
            Solve(12, 13, 14, "Game (?<GameId>\\d+): ", secondPart:true);

        public int Solve(int r, int g, int b, string rx, bool secondPart = false,string[] test = null) {
            var lines = Resources.input.Split('\n');
            if(test != null)
            {
                lines = test;
            }
            int idSum = 0;
            int powerSum = 0;
            foreach(var line in lines)
            {
                int maxRed = 0;
                int maxGreen = 0;
                int maxBlue = 0;
                int id = int.Parse(Regex.Match(line, rx).Groups["GameId"].Value);
                Console.WriteLine(line);
                var games = Regex.Matches(line, " \\d+ \\w+(, \\d+ \\w+)*");
                bool validGame = true;
                foreach (var game in games) {
                    var red = Regex.Match(game.ToString()!, "(\\d+ red)");
                    var redCount = Regex.Match(red.Value, "\\d+");
                    var green = Regex.Match(game.ToString()!, "(\\d+ green)");
                    var greenCount = Regex.Match(green.Value, "\\d+");
                    var blue = Regex.Match(game.ToString()!, "(\\d+ blue)");
                    var blueCount = Regex.Match(blue.Value, "\\d+");

                    if (red.Success)
                    {
                        if(int.Parse(redCount.Value) > maxRed)
                        {
                            maxRed = int.Parse(redCount.Value);
                        }
                        if(int.Parse(redCount.Value) > r)
                        {
                            validGame = false;

                        }
                    }
                    if (green.Success)
                    {
                        if(int.Parse(greenCount.Value) > maxGreen)
                        {
                            maxGreen = int.Parse(greenCount.Value);
                        }
                        if(int.Parse(greenCount.Value) > g)
                        {
                            validGame = false;

                        }

                    }
                    if (blue.Success)
                    {
                        if (int.Parse(blueCount.Value) > maxBlue)
                        {
                            maxBlue = int.Parse(blueCount.Value);
                        }
                        if (int.Parse(blueCount.Value) > b)
                        {
                            validGame = false;

                        }

                    }
                }
                powerSum += maxRed * maxBlue * maxGreen;
                if (validGame)
                {
                    idSum += id;
                }
            }
            if (secondPart)
                return powerSum;
            return idSum;
        }
    
    
    }

    class Program
    {
        public static void Main(string[] args)
        {
            var sol = new Solution();
            Console.WriteLine(sol.PartOne(Resources.input.Split("\n")));
            Console.WriteLine(sol.PartTwo(Resources.input.Split("\n")));
        }
    }

}
