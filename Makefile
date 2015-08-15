CFLAGS=-I. -Wall
OBJS=vec2f.o
PRGS=aa

ALL: $(PRGS)

aa: aa.o $(OBJS)
	g++ -o $@ aa.o $(OBJS)

%.o: %.cc %.h
	g++ $(CFLAGS) -c -o $@ $<

clean:
	rm -f $(OBJS) $(PRGS)
