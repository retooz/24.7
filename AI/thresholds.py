

# 스쿼트 자세 범위
def thresholds_squat():

    _ANGLE_HIP_KNEE_VERT = {
                            'NORMAL' : (165, 180),
                            'TRANS'  : (120, 160),
                            'PASS'   : (0, 120)
                           }    
    thresholds = {
                    'HIP_KNEE_VERT': _ANGLE_HIP_KNEE_VERT
                }
    return thresholds



# 런지 자세 범위
def thresholds_lunge():

    _ANGLE_HIP_FRONT_KNEE = {
                            'NORMAL' : (115, 180),
                            'PASS'   : (0, 110)
                        }     
    thresholds = {
                    'HIP_FRONT_KNEE_VERT': _ANGLE_HIP_FRONT_KNEE
                }
    return thresholds



# 푸쉬업 자세 범위
def thresholds_pushup():

    _ANGLE_SHLDR_ELBOW_VERT = {
                            'NORMAL' : (0,  35),
                            'PASS'  : (40, 120)
                        }    
    thresholds = {
                    'SHLDR_ELBOW_VERT': _ANGLE_SHLDR_ELBOW_VERT
                }
    return thresholds