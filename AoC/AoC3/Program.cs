using AoC3.Properties;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

namespace AoC3
{

    public class SolutionNew
    {
        private string[] _input;
        private int _height;
        private int _width;
        public SolutionNew(string[] input) {
            _input = input;
            _width = input.FirstOrDefault()!.Length;
            _height = input.Length;
        }
        public int PartOne()
        {
            int sum = 0;
            List<Part> nums = new List<Part>();
            List<Part> symbols = new List<Part>();
            for (int row = 0; row < _height; row++)
            {
                var numsMatched = Parse(_input[row],row, @"\d+");
                var symbolsMatched = Parse(_input[row], row, @"[^.0-9]");
                nums.AddRange(numsMatched);
                symbols.AddRange(symbolsMatched);
            }

            foreach(Part num in nums)
            {
                foreach(Part sym in symbols)
                {
                    if(areClose(num, sym))
                    {
                        sum += num.ContentToInt; break;
                    }
                }
            }

            return sum;
        }

        public int PartTwo()
        {
            int sum = 0;
            List<Part> stars = new List<Part>();
            List<Part> nums = new List<Part>();
            for (int row = 0; row < _height; row++)
            {
                var starsMatched = Parse(_input[row], row, @"\*");
                var numsMatched = Parse(_input[row], row, @"\d+");
                stars.AddRange(starsMatched);
                nums.AddRange(numsMatched);

            }

            foreach (Part star in stars)
            {
                int first = -1;
                foreach (Part num in nums)
                {
                    if (areClose(star, num))
                    {
                        _ = first == -1 ? first = num.ContentToInt : sum += first * num.ContentToInt;  
                    }
                }
            }
            return sum;
        }

        public List<Part> Parse(string input, int row, string rx)
        {
            return Regex.Matches(input, rx).Cast<Match>().Select(m => new Part(m.Value, row, m.Index)).ToList();
        }

        public bool areClose(Part p1, Part p2)
        {
            if (Math.Abs(p1.row - p2.row) <= 1 &&
                p1.col <= p2.col + p2.content.Length &&
                p2.col <= p1.col + p1.content.Length)
                return true;
            return false;
        }

        public record Part(string content, int row, int col)
        {
           public int ContentToInt => int.Parse(content);
        }
    }

    public class SolutionGit   
    {

        // Introduce a Parse function that returns the interesting 'blocks' of texts 
        // and positions using a regex. Then just filter and match these according
        // to the problem spec.

        public object PartOne()
        {
            var rows = Resources.input.Split("\r\n");
            var symbols = Parse(rows, new Regex(@"[^.0-9]"));
            var nums = Parse(rows, new Regex(@"\d+"));

            return (
                from n in nums
                where symbols.Any(s => Adjacent(s, n))
                select n.Int
            ).Sum();
        }

        public object PartTwo(string input)
        {
            var rows = input.Split("\n");
            var gears = Parse(rows, new Regex(@"\*"));
            var numbers = Parse(rows, new Regex(@"\d+"));

            return (
                from g in gears
                let neighbours = from n in numbers where Adjacent(n, g) select n.Int
                where neighbours.Count() == 2
                select neighbours.First() * neighbours.Last()
            ).Sum();
        }

        // checks that the parts are touching each other, i.e. rows are within 1 
        // step and also the columns (using https://stackoverflow.com/a/3269471).
        bool Adjacent(Part p1, Part p2) =>
            Math.Abs(p2.Irow - p1.Irow) <= 1 &&
            p1.Icol <= p2.Icol + p2.Text.Length &&
            p2.Icol <= p1.Icol + p1.Text.Length;

        // returns the matches of rx with its coordinates
        Part[] Parse(string[] rows, Regex rx) => (
            from irow in Enumerable.Range(0, rows.Length)
            from match in rx.Matches(rows[irow])
            select new Part(match.Value, irow, match.Index)
        ).ToArray();
    }

    record Part(string Text, int Irow, int Icol)
    {
        public int Int => int.Parse(Text);
    }

    public class Solution
    {
        private int _x;
        private int _y;
        private string[] _input;

        public Solution(string[] input)
        {
            _input = input;
            _x = input[0].Length;
            _y = input.Length;
        }

        public int digitIndicesToInt(int digitStart, int digitEnd, int row)
        {
            string number = "";
            for (; digitStart <= digitEnd; digitStart++)
            {
                number = number + _input[row][digitStart];
            }

            return int.Parse(number);

        }
        public bool isPartNumber(int digitStart, int digitEnd, int y)
        {
            for (; digitStart <= digitEnd; digitStart++)
            {
                if (digitStart - 1 >= 0 && _input[y][digitStart - 1] != '.' && ((_input[y][digitStart - 1] - '0') < 0 || (_input[y][digitStart - 1] - '0') > 9))
                {
                    return true;
                }
                if (digitStart + 1 < _x && _input[y][digitStart + 1] != '.' && ((_input[y][digitStart + 1] - '0') < 0 || (_input[y][digitStart + 1] - '0') > 9))
                {
                    return true;
                }
                if (y - 1 >= 0 && _input[y - 1][digitStart] != '.')
                {
                    return true;
                }
                if (y + 1 < _y && _input[y + 1][digitStart] != '.')
                {
                    return true;
                }
                if (y + 1 < _y && digitStart + 1 < _x && _input[y + 1][digitStart + 1] != '.')
                {
                    return true;
                }
                if (y + 1 < _y && digitStart - 1 >= 0 && _input[y + 1][digitStart - 1] != '.')
                {
                    return true;
                }
                if (y - 1 >= 0 && digitStart - 1 >= 0 && _input[y - 1][digitStart - 1] != '.')
                {
                    return true;
                }
                if (y - 1 >= 0 && digitStart + 1 < _x && _input[y - 1][digitStart + 1] != '.')
                {
                    return true;
                }

            }

            return false;

        }

        public record Coordinates(int x, int y);

        public Tuple<int,HashSet<Coordinates>> NumberLocation(int x, int y)
        {
            int leftDigits = x;
            int rightDigits = x;
            var set = new HashSet<Coordinates>();
            Coordinates current = new Coordinates(x, y);
            set.Add(current) ;
            for (; leftDigits >= 0 && Char.IsDigit(_input[y][leftDigits]); leftDigits--)
            {
              
                set.Add(new Coordinates(leftDigits, y));
            }
            for (; rightDigits < _x && Char.IsDigit(_input[y][rightDigits]); rightDigits++)
            {
                set.Add(new Coordinates(rightDigits, y));
            }

            int number = digitIndicesToInt(leftDigits + 1, rightDigits - 1, y);

            return new Tuple<int, HashSet<Coordinates>>(number, set);
        }
        public int GetGearSum(int x, int y)
        {
            HashSet<Coordinates> visited = new HashSet<Coordinates>();

            List<int> numbers = new List<int>();

            if (x - 1 >= 0 && !visited.Contains(new Coordinates(x - 1, y)) && ((_input[y][x - 1] - '0') >= 0 && (_input[y][x - 1] - '0') <= 9))
            {
                var tuple = NumberLocation(x - 1, y);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
                
            }
            if (x + 1 < _x && !visited.Contains(new Coordinates(x + 1, y)) && ((_input[y][x + 1] - '0') >= 0 && (_input[y][x + 1] - '0') <= 9))
            {
                var tuple = NumberLocation(x + 1, y);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
            }
            if (y - 1 >= 0 && !visited.Contains(new Coordinates(x, y - 1)) && ((_input[y - 1][x] - '0') >= 0 && (_input[y - 1][x] - '0') <= 9))
            {
                var tuple = NumberLocation(x, y-1);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
            }
            if (y + 1 < _y && !visited.Contains(new Coordinates(x, y + 1)) && ((_input[y+1][x] - '0') >= 0 && (_input[y+1][x] - '0') <= 9))
            {
                var tuple = NumberLocation(x, y + 1);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
            }
            if (y + 1 < _y && x + 1 < _x && !visited.Contains(new Coordinates(x + 1, y + 1)) && ((_input[y + 1][x + 1] - '0') >= 0 && (_input[y + 1][x + 1] - '0') <= 9))
            {
                var tuple = NumberLocation(x + 1, y + 1);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
            }
            if (y + 1 < _y && x - 1 >= 0 && !visited.Contains(new Coordinates(x - 1, y + 1)) && ((_input[y + 1][x - 1] - '0') >= 0 && (_input[y + 1 ][x - 1] - '0') <= 9))
            {
                var tuple = NumberLocation(x - 1, y + 1);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
            }
            if (y - 1 >= 0 && x - 1 >= 0 && !visited.Contains(new Coordinates(x - 1, y - 1)) && ((_input[y-1][x - 1] - '0') >= 0 && (_input[y - 1][x - 1] - '0') <= 9))
            {
                var tuple = NumberLocation(x - 1, y - 1);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
            }
            if (y - 1 >= 0 && x + 1 < _x && !visited.Contains(new Coordinates(x + 1, y - 1)) && ((_input[y - 1][x + 1] - '0') >= 0 && (_input[y - 1][x + 1] - '0') <= 9))
            {
                var tuple = NumberLocation(x + 1, y -1);
                numbers.Add(tuple.Item1);
                visited.UnionWith(tuple.Item2);
            }

            if(numbers.Count == 2)
            {
                return numbers[0] * numbers[1];
            }
            else
            {
                return 0;
            }
        }
        public int PartOne()
        {
            int sum = 0;
            for (int i = 0; i < _y; i++)
            {
                int digitStart = -1;
                int digitEnd = -1;

                for (int j = 0; j < _input[i].Length; j++)
                {
                    if (Char.IsDigit(_input[i][j])) // first digit
                    {

                        if (digitStart == -1)
                        {
                            digitStart = j;
                            digitEnd = j;
                        }
                        else
                        {
                            digitEnd = j;
                        }

                        if (j == _input[i].Length - 1)
                        {
                            if (isPartNumber(digitStart, digitEnd, i))
                            {
                                sum += digitIndicesToInt(digitStart, digitEnd, i);
                            }

                        }

                    }
                    else
                    {
                        if (digitStart != -1)
                        {
                            if (isPartNumber(digitStart, digitEnd, i))
                            {
                                sum += digitIndicesToInt(digitStart, digitEnd, i);
                            }

                            digitStart = -1;
                            digitEnd = -1;
                        }
                    }

                }
            }

            return sum;
        }

        public int PartTwo()
        {
            int sum = 0;
            for(int i = 0; i < _y; i++)
            {
                for(int j = 0; j < _x; j++)
                {
                    if (_input[i][j] == '*')
                    {
                        sum += GetGearSum(j, i);
                    }
                }
            }

            return sum;
        }
        


    }
    class Program
    {
        public static void Main(string[] args)
        {

            var input = Resources.input.Split("\r\n");
            int len = input.Length;
            //Console.WriteLine(input.All(s => s.Length == len));
            var sol = new Solution(input);
            Stopwatch sw = new Stopwatch();
            sw.Start();

            Console.WriteLine(sol.PartOne());
            sw.Stop();
            Console.WriteLine("Elapsed={0}", sw.Elapsed);
            //Console.WriteLine(sol.PartTwo());
            sw.Restart();
            var solGit = new SolutionGit();
            Console.WriteLine(solGit.PartOne());
            sw.Stop();
            Console.WriteLine("Elapsed={0}", sw.Elapsed);

            sw.Restart();
            var solNew = new SolutionNew(input);
            Console.WriteLine(solNew.PartOne());
            sw.Stop();
            Console.WriteLine("Elapsed={0}", sw.Elapsed);

            Console.WriteLine(solNew.PartTwo());

        }

    }
}