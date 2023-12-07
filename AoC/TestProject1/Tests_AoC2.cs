using AoC2;

namespace TestProject1
{
    public class Tests2
    {
        private Solution sol;
        [SetUp]
        public void Setup()
        {
            sol = new AoC2.Solution();
        }

        [Test]
        public void Test1()
        {
            var input = new string[] { "Game 1: 2 red, 2 green; 1 red, 1 green, 2 blue; 3 blue, 3 red, 3 green; 1 blue, 3 green, 7 red; 5 red, 3 green, 1 blue" };
            Assert.That(sol.PartOne(input) == 1);
        }



        [Test]
        public void Test2()
        {
            var input = new string[] { 
                "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", 
                "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue", 
                "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red", 
                "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red", 
                "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green" 
            };
            Assert.That(sol.PartOne(input) == 8);
        }


        [Test]
        public void Test3()
        {
            var input = new string[] {
                "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
                "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
                "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
                "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
                "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
            };
            Assert.That(sol.PartTwo(input) == 2286);
        }
    }
}