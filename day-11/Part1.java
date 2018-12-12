import java.util.stream.IntStream;

/**
 *
 */
public final class Part1 {

  private Part1() {
  }

  static int serial = 7403;

  public static int compute(int x, int y) {
    int id = x + 10;
    int a = (id * y + serial) * id;
    int b = (a / 100) % 10;
    return b - 5;
  }

  public static int computeLayer(int x, int y, int size) {
    int res = 0;
    res += IntStream.range(0, size).map(i -> compute(x + i, y + size - 1)).sum();
    res += IntStream.range(0, size - 1).map(i -> compute(x + size - 1, y + i)).sum();
    return res;
  }

  static class Result {
    public int x, y, size, score = -1;
  }

  public static void main(String[] args) {
    
    //for (int x = 1; x <= 298; x++) {
    Result res =
    IntStream.range(1, 299).parallel().mapToObj(x -> {
      Result result = new Result();
      for (int y = 1; y <= 298; y++) {
        int tmp = compute(x, y) + computeLayer(x, y, 2);
        for (int i = 3; i <= 301; i++) {
          if (x + i > 300) {
            break;
          }
          tmp += computeLayer(x, y, i);
          if (tmp > result.score) {
            result.score = tmp;
            result.x = x;
            result.y = y;
            result.size = i;
          }
        }
      }
      return result;
    }).reduce((a, b) -> a.score > b.score ? a : b).get();

    System.out.println(res.x + "," + res.y + "," + res.size);
  }
}

