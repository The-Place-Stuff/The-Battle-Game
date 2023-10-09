import { MusicVolume } from './musicVolume.js'
import { WarpVolume } from './warpVolume.js'
import { Vector3d } from '../../util/vectors.js' 

export const WARP_TO_PLAINS = new WarpVolume(
    new Vector3d(9916, 16, 9987), 
    new Vector3d(9995, -64, 10017), 
    new Vector3d(9995, 64, 10017)
)

export const PLAINS_MUSIC = new MusicVolume(
    'music.plains', 
    new Vector3d(9962, -64, 9734), 
    new Vector3d(9727, 64, 10064)
)

