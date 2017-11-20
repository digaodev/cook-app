export class UploadedImage {
  constructor(
    public url: string,
    public thumbnail_url?: string,
    public original_filename?: string,
    public format?: string,
    public public_id?: string,
    public bytes?: string
  ) {
  }
}
