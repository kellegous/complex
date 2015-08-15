#ifndef EM_VEC2F_H_
#define EM_VEC2F_H_

class Vec2f {
public:
  Vec2f(): _x(0), _y(0) {}

  Vec2f(float x, float y) : _x(x), _y(y) {}

  float x() const {
    return _x;
  }

  float y() const {
    return _y;
  }

  float len() const;
  void normalize(const Vec2f& src);
  void set(float x, float y);

  static float dot(const Vec2f& a, const Vec2f& b);
private:
  float _x;
  float _y;
};

#endif // EM_VEC2F_H_
