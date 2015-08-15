#include "aa.h"

#include "vec2f.h"

#include <stdio.h>

int main(int argc, char* argv[]) {
  Vec2f a(2.0, 3.0);

  a.normalize(a);

  printf("%0.2f, %0.2f\n", a.x(), a.y());
  return 0;
}
