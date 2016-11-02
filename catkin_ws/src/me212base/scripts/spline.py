import numpy as np
import matplotlib.pyplot as plt
from scipy import interpolate

def spline(x,y):
	tck, u = interpolate.splprep([x,y], s=0) # generate a spline function
	unew = np.arange(0, 1.01, 0.01)
	out = interpolate.splev(unew, tck) #interpolate from the function
	der = interpolate.splev(unew, tck, der = 1)
	second_der = interpolate.splev(unew, tck, der = 2)
	delta_l = (der[0]**2 + der[1]**2)**0.5
	k = (der[0]*second_der[1] - der[0]*second_der[0])/((der[0]**2 + der[1]**2)**1.5)
	return [k,out,delta_l]

if __name__ == '__main__':
	t = np.arange(0, 1.1, .1) #parametrically-defined curve
	x = np.sin(2*np.pi*t)
	y = np.cos(2*np.pi*t)
	# x = [1, 2, 3, 4, 5, 6, 7]
	# y = [2, 5, 7, 10, 12, 7, 2]
	
	out = spline(x,y)[1]
	plt.figure()
	plt.plot(x, y, 'o', out[0], out[1], x, y, 'b')
	plt.legend(['Linear', 'Cubic Spline'])
	x_min = min(x)
	x_max = max(x)
	y_min = min(y)
	y_max = max(y)
	plt.xlim([x_min-1, x_max+1])
	plt.ylim([y_min-1, y_max+1])
	plt.title('Spline')
	plt.show()


""" linear spline

import matplotlib.pyplot as plt
x = [1, 2, 3, 4, 5, 6, 7]
y = [2, 5, 7, 10, 12, 7, 2]
plt.xlim([0, 8])
plt.ylim([0, 14])
plt.plot(x, y, '-o')
plt.show()

"""
"""cubic spline

import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import interp1d

x = [1, 2, 3, 4, 5, 6, 7]
y = [2, 5, 7, 10, 12, 7, 2]

f = interp1d(x, y, kind='cubic')    # 3 order spline
xnew = np.linspace(1, 7, num=51)    # generate x

plt.xlim([0, 8])
plt.ylim([0, 14])
plt.plot(x, y, 'o')
plt.plot(xnew, f(xnew), '-') # you can use like f(x)
plt.show()
print f(xnew)
"""