import { BatchId, Topic } from '..'

export { getCollectionSize } from './collection'
export { getFolderSize } from './collection.node'

export {
  assertBytes,
  assertFlexBytes,
  Bytes,
  bytesAtOffset,
  bytesEqual,
  FlexBytes,
  flexBytesAtOffset,
  isBytes,
  isFlexBytes,
} from './bytes'

export {
  assertHexString,
  assertPrefixedHexString,
  bytesToHex,
  HexString,
  hexToBytes,
  intToHex,
  isHexString,
  makeHexString,
  PrefixedHexString,
} from './hex'

export {
  capitalizeAddressERC55,
  EthAddress,
  ethToSwarmAddress,
  fromLittleEndian,
  isHexEthAddress,
  makeEthAddress,
  makeEthereumWalletSigner,
  makeHexEthAddress,
  toLittleEndian,
} from './eth'

export { keccak256Hash } from './hash'
export { makeMaxTarget } from './pss'

export {
  getAmountForTtl,
  getDepthForCapacity,
  getStampCostInBzz,
  getStampCostInPlur,
  getStampEffectiveBytes,
  getStampMaximumCapacityBytes,
  getStampTtlSeconds,
  getStampUsage,
} from './stamps'

export { approximateOverheadForRedundancyLevel, getRedundancyStat, getRedundancyStats } from './redundancy'

export const NULL_STAMP: BatchId = '0000000000000000000000000000000000000000000000000000000000000000' as BatchId
export const NULL_TOPIC: Topic = '0000000000000000000000000000000000000000000000000000000000000000' as Topic
