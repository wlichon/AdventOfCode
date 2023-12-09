using AoC4;

namespace TestProject1
{
    public class Tests4
    {


        [Test]
        public void Test1()
        {
            string[] input = {"Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"};
            Solution sol = new Solution(input);
            int result = sol.PartOne();
            Assert.That(result == 8);
        }



        [Test]
        public void Test2()
        {
            string[] input = { "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36" };
            Solution sol = new Solution(input);
            int result = sol.PartOne();
            Assert.That(result == 0);
        }

        [Test]
        public void Test3()
        {
            string[] input = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\r\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\r\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\r\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\r\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\r\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11".Split("\r\n");
            Solution sol = new Solution(input);
            int result = sol.PartOne();
            Assert.That(result == 13);
        }


        [Test]
        public void Test4()
        {
            string[] input = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\r\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19".Split("\r\n");
            Solution sol = new Solution(input);
            long result = sol.PartTwo();
            Assert.That(result == 3);
        }

        [Test]
        public void Test5()
        {
            string[] input = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\r\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\r\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1".Split("\r\n");
            Solution sol = new Solution(input);
            long result = sol.PartTwo();
            Assert.That(result == 7);
        }

        [Test]
        public void Test6()
        {
            string[] input = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\r\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\r\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\r\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\r\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\r\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11".Split("\r\n");
            Solution sol = new Solution(input);
            long result = sol.PartTwo();
            Assert.That(result == 30);
        }


    }
}