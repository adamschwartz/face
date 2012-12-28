## Face

![Adam faces](https://raw.github.com/adamschwartz/face/master/resources/adam%20faces.png)

### Demo

Check out the [demo of **Face**](http://adamschwartz.co/face).

#### Stippel Generator

The SVG data for the face was generated from [StippelGen](http://www.evilmadscientist.com/2012/stipplegen-weighted-voronoi-stippling-and-tsp-paths-in-processing/) which can be downloaded from [Google Code](http://code.google.com/p/eggbotcode/downloads/list?q=stipplegen).

#### Animations

The animations were hand-coded. The hover animation follows the TSP path by using adjacent sibling selectors (jQuery's `next` and `prev`).

The other animations are done by animating the `cy` property of the SVG elements using a jQuery `animate` call and tapping into the `step` callback.