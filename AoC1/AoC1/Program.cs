using AoC1.Properties;
using System.ComponentModel;
using System.Text.RegularExpressions;
using System.Transactions;

namespace AoC1
{

    public class Solution
    {
        public int PartOne() => 
            Solve("\\d");
        

        public int PartTwo() =>
            Solve("\\d|one|two|three|four|five|six|seven|eight|nine");


        int Solve(string rx) => (
            from line in Resources.calibrationDoc.Split("\n")
            let first = Mapping(Regex.Match(line, rx, RegexOptions.None).Value)
            let right = Mapping(Regex.Match(line, rx, RegexOptions.RightToLeft).Value)
            select first * 10 + right
        ).Sum();

        int Mapping(string num) => num switch
        {
            "one" => 1,
            "two" => 2,
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9,
            var d => Convert.ToChar(d) - '0'
        };
        
    }
    public class Program
    {

        public static void Main(string[] args)
        {

            var sol = new Solution();
            Console.WriteLine(sol.PartOne());
            Console.WriteLine(sol.PartTwo());
        }

    }

}
