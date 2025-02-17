import type {
  BatchId,
  BeeRequestOptions,
  Data,
  ReferenceOrEns,
  ReferenceResponse,
  UploadOptions,
  UploadResult,
} from '../types'
import { wrapBytesWithHelpers } from '../utils/bytes'
import { extractUploadHeaders } from '../utils/headers'
import { http } from '../utils/http'
import { makeTagUid } from '../utils/type'

const endpoint = 'chunks'

/**
 * Upload chunk to a Bee node
 *
 * The chunk data consists of 8 byte span and up to 4096 bytes of payload data.
 * The span stores the length of the payload in uint64 little endian encoding.
 * Upload expects the chuck data to be set accordingly.
 *
 * @param requestOptions Options for making requests
 * @param data Chunk data to be uploaded
 * @param stamp BatchId or marshaled stamp to be used for the upload
 * @param options Additional options like tag, encryption, pinning
 */
export async function upload(
  requestOptions: BeeRequestOptions,
  data: Uint8Array,
  stamp: BatchId | Uint8Array | string,
  options?: UploadOptions,
): Promise<UploadResult> {
  const response = await http<ReferenceResponse>(requestOptions, {
    method: 'post',
    url: `${endpoint}`,
    data,
    headers: {
      'content-type': 'application/octet-stream',
      ...extractUploadHeaders(stamp, options),
    },
    responseType: 'json',
  })

  return {
    reference: response.data.reference,
    tagUid: response.headers['swarm-tag'] ? makeTagUid(response.headers['swarm-tag']) : undefined,
    historyAddress: response.headers['swarm-act-history-address'] || '',
  }
}

/**
 * Download chunk data as a byte array
 *
 * @param requestOptions Options for making requests
 * @param hash Bee content reference
 *
 */
export async function download(requestOptions: BeeRequestOptions, hash: ReferenceOrEns): Promise<Data> {
  const response = await http<ArrayBuffer>(requestOptions, {
    responseType: 'arraybuffer',
    url: `${endpoint}/${hash}`,
  })

  return wrapBytesWithHelpers(new Uint8Array(response.data))
}
