using AoC3;

namespace TestProject1
{
    public class Tests3
    {


        [Test]
        public void Test1()
        {
            var input = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".Split("\n");
            Solution sol = new Solution(input);
            bool result = sol.isPartNumber(5, 7, 0);
            Assert.That(result == false);
        }



        [Test]
        public void Test2()
        {
            var input = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".Split("\n");
            Solution sol = new Solution(input);
            bool result = sol.isPartNumber(2, 4, 6);
            Assert.That(result == true);
        }

        [Test]
        public void Test3()
        {
            var input = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".Split("\n");
            Solution sol = new Solution(input);
            int result = sol.digitIndicesToInt(2, 4, 6);
            Assert.That(result == 592);
        }

        [Test]
        public void Test4()
        {
            var input = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".Split("\n");
            Solution sol = new Solution(input);
            int result = sol.PartOne();
            Assert.That(result == 4361);
        }

        [Test]
        public void Test5()
        {
            var input = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".Split("\n");
            Solution sol = new Solution(input);
            bool result = sol.isPartNumber(0, 2, 4);
            Assert.That(result == true);
        }

        [Test]
        public void Test6()
        {
            var input = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".Split("\n");
            Solution sol = new Solution(input);
            int result = sol.digitIndicesToInt(0, 2, 0);
            Assert.That(result == 467);
        }

        [Test]
        public void Test7()
        {
            var input = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".Split("\n");
            Solution sol = new Solution(input);
            int result = sol.digitIndicesToInt(2, 3, 2);
            Assert.That(result == 35);
        }

        [Test]
        public void Test8()
        {
            var input = "..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........".Split("\n");
            Solution sol = new Solution(input);
            int result = sol.PartOne();
            Assert.That(result == 0);
        }
        
        [Test]
        public void Test9()
        {
            var input = "..........\n.......*512\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........".Split("\n");
            Solution sol = new Solution(input);
            int result = sol.PartOne();
            Assert.That(result == 512);
        }

        [Test]
        public void Test10()
        {
            var input = "..........\n.......512\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........".Split("\n");
            Solution sol = new Solution(input);
            int result = sol.PartOne();
            Assert.That(result == 0);
        }
    }
}