#include "vec2f.h"

#include <math.h>

// static
float Vec2f::dot(const Vec2f& a, const Vec2f& b) {
  return a.x()*b.x() + a.y()*b.y();
}

float Vec2f::len() const {
  return sqrt(_x*_x + _y*_y);
}

void Vec2f::normalize(const Vec2f& src) {
  float l = src.len();
  _x = src.x() / l;
  _y = src.y() / l;
}

void Vec2f::set(float x, float y) {
  _x = x;
  _y = y;
}
