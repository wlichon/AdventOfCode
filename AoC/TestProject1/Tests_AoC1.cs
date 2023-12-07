using AoC1;

namespace TestProject1
{
    public class Tests1
    {
        private Solution sol;
        [SetUp]
        public void Setup()
        {
            sol = new AoC1.Solution();
        }

        [Test]
        public void Test1()
        {
            Assert.That(sol.PartOne(new string[] { "pqr3stu8vwx" }) == 38);
        }

    

        [Test]
        public void Test2()
        {
            Assert.That(sol.PartTwo(new string[] { "a1b2c3d4e5f" }) == 15);
        }
    }
}