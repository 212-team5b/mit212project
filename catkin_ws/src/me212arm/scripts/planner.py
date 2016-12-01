import numpy as np

joint_limits = [
    [-2*np.pi, 2*np.pi],  # make joint 1 smaller from real
    [-np.pi/2, np.pi/2]]  

# length of two links
a1 = 0.3
a2 = 0.335
r = 0.2921

def in_joint_range(q):
    for i, qi in enumerate(q):
        if qi < joint_limits[i][0] or qi > joint_limits[i][1]:
            return False
    return True
    
def select_best_q(candidates, q0, weight = [1,1]):
    # we prefer minimum travel
    min_v = None
    best_q = None
    for q in candidates:
        v = np.sum(((np.array(q) - np.array(q0)) * np.array(weight)) ** 2)
        if (min_v == None or min_v > v) and in_joint_range(q):
            min_v = v
            best_q = q
    return best_q

def ik(target_TCP_xz, q0):
    x, z = target_TCP_xz[0], target_TCP_xz[1]
    ik_candidate = []
    
    #xz2 = x**2 + z**2  ## In Python, x**y: x to the power y
    #num = (a1+a2) ** 2 - xz2
    #denom = xz2 - (a1-a2) ** 2
    #print num, denom
    
    ## candidate 1
    #q_2 = 2 * np.arctan(np.sqrt(num / denom))
    #q_1 = (np.arctan2(z,x) - np.arctan2( a2 * np.sin(q_2), a1 + a2 * np.cos(q_2))- np.pi/2) 
    ##print 'q1,q2', q_1, q_2
    
    #if not np.isnan([q_1, q_2]).any():
        #ik_candidate.append([q_1, q_2])
    
    ## candidate 2
    #q_2 *= -1 
    #q_1 = (np.arctan2(z,x) - np.arctan2( a2 * np.sin(q_2), a1 + a2 * np.cos(q_2))- np.pi/2) 
    
    ##print 'q1,q2', q_1, q_2
    #if not np.isnan([q_1, q_2]).any():
        #ik_candidate.append([q_1, q_2])
    q1 = (1/r)*(target_TCP_xz[0] - a2*np.sin(np.arccos(target_TCP_xz[1]/a2)))
    q2 = np.arccos(target_TCP_xz[1]/a2)
    
    
    return [q1,q2]

def ikv(target_TCP_vel, q0):
    J = Jacobian(q0)
    qdot = np.linalg.solve(J, target_TCP_vel).tolist()  # "J \ target_TCP_vel" in matlab
    return qdot

def Jacobian(q):
    q1 = q[0]
    q2 = q[1]
    #s1 = np.sin(q1)
    #s12 = np.sin(q1+q1)
    #c1 = np.cos(q1)
    #c12 = np.cos(q1+q1)
    J = np.array([ [r, a2*np.cos(q2)],[0, -a2*np.sin(q2)]]) 
    
    return J

# return end point of the second link
def fk(q):
    #th1 = q[0] + np.pi / 2
    #th12 = th1 + q[1]
    
    
    return [ q[0]*r + a2*np.sin(q[1]), a2*np.cos(q[1])]

# return end point of the first link
def fk1(q):
    #th1 = q[0] + np.pi / 2
    return [q[0]*r, 0]


