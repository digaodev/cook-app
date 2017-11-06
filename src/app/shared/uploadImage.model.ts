export class UploadImage {
  constructor(
    public url: string,
    public thumbnail_url?: string,
    public original_filename?: string,
    public delete_token?: string,
    public format?: string,
    public public_id?: string,
    public bytes?: string
  ) {
  }
}
