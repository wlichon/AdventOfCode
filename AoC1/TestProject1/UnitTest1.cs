using AoC1;

namespace TestProject1
{
    public class Tests
    {
        private Solution sol;
        [SetUp]
        public void Setup()
        {
            sol = new Solution();
        }

        [Test]
        public void Test1()
        {
            Assert.That(sol.Iteration("pqr3stu8vwx", "\\d") == 38);
        }

    

        [Test]
        public void Test2()
        {
            Assert.That(sol.Iteration("a1b2c3d4e5f", "\\d") == 15);
        }
    }
}