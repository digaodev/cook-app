interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  {
    name: 'cloudinary',
    src: 'https://widget.cloudinary.com/global/all.js'
  },
  {
    name: 'jQuery',
    src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'
  }
];
