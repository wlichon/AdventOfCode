using AoC4.Properties;
using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;

namespace AoC4
{
    public class Solution
    {
        private string[] _input;
        public Solution(string[] input)
        {
            _input = input;

        }
        public int PartOne()
        {
            int points = 0;
            foreach(string game in _input)
            {
                points += CardPoints(game);
            }

            return points;
        }

        public long PartTwo()
        {
            long cards = 0;
            Dictionary<int, int> indicesToCopies = new Dictionary<int, int>();

            for(int i = 0; i < _input.Length; i++)
            {
                indicesToCopies[i] = 1;
            }
            for (int i = 0; i < _input.Length; i++)
            {

                int result = CardPoints(_input[i], secondPart:true);
                for(int j = 1; j <= result; j++)
                {
                    if(j + i < _input.Length)
                    {
                        indicesToCopies[j + i] += indicesToCopies[i];
                    }
                    
                }
                cards += indicesToCopies[i];
            }

            return cards;
        }

        public int CardPoints(string card, bool secondPart = false)
        {
            int matched = 0;
            string[] separated = card.Split("|");
            List<int> winningNums = Parse(separated[0].Substring(separated[0].IndexOf(':')+1), @"(\d+)");
            List<int> pickedNums = Parse(separated[1], @"(\d+)");

            //HashSet<int> winningNums = new HashSet<int>();
            
            foreach(int num in pickedNums)
            {
                if (winningNums.Contains(num))
                {
                    matched++;
                }
            }
            if (secondPart)
            {
                return matched;
            }
            return (int)Math.Pow(2, matched - 1);

        }

        /*
        public List<int> Parse(string input, string rx)
        {
            return Regex.Matches(input, rx).Cast<Match>().Select(m => int.Parse(m.Value)).ToList();
        }
        */

        public List<int> Parse(string input, string rx)
        {
            List<int> nums = new List<int>();
            MatchCollection matches = Regex.Matches(input, rx);

            foreach(Match match in matches)
            {
                nums.Add(int.Parse(match.Value));
            }

            return nums;
        }

    }
    class Program
    {
        public static void Main(string[] args)
        {
            var sol = new Solution(Resources.input.Split("\r\n"));
            Console.WriteLine(sol.PartOne());
            Console.WriteLine(sol.PartTwo());
        }
    }


}