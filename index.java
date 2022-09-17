class Solution {
    public static int solution(int[] scoville, int K) {
        int count = 0;
        int[] foods = new int[scoville.length + 1];
        int top = 0;
        for (int foodScoville : scoville) {
            insert(foods, foodScoville, ++top);
        }

        // for (int i = 0; i < foods.length; i++) {
        // System.out.print(foods[i]);
        // }
        while (foods[1] < K) {
            int newFood = extract(foods, top--);
            newFood += (extract(foods, top--) * 2);
            insert(foods, newFood, ++top);
            count++;
        }
        return count;
    }

    public static void insert(int[] foods, int scoville, int top) {
        foods[top] = scoville;
        if (top != 1) {
            int idx = top / 2;
            if (foods[idx] > scoville) {
                foods[top] = foods[idx];
                insert(foods, scoville, idx);
            }
        }
        return;
    }

    public static int extract(int[] foods, int top) {
        int minValue = foods[1];
        foods[1] = foods[top];

        int idx = 1;
        while (idx * 2 + 1 < foods.length) {
            int prev = idx;
            if (foods[idx] > foods[idx * 2] && foods[idx * 2] <= foods[idx * 2 + 1]) {
                int tmp = foods[idx];
                foods[idx] = foods[idx * 2];
                foods[idx * 2] = tmp;
                idx = idx * 2;
                continue;
            }

            if (foods[idx] > foods[idx * 2 + 1]) {
                int tmp = foods[idx];
                foods[idx] = foods[idx * 2 + 1];
                foods[idx * 2 + 1] = tmp;
                idx = idx * 2 + 1;
                continue;
            }
            if (prev == idx) {
                break;
            }
        }
        return minValue;
    }

    public static void main(String[] args) {
        int[] input = { 1, 2, 3, 9, 10, 12 };
        System.out.println(solution(input, 7));
    }
}