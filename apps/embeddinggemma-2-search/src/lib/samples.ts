export type SampleNote = { id: string; text: string }
export type SampleImage = { id: string; file: string; label: string }

export const SAMPLE_NOTES: SampleNote[] = [
  {
    id: 'note-vet',
    text: 'The golden retriever has a vet checkup on Tuesday morning.',
  },
  {
    id: 'note-bread',
    text: 'Sourdough recipe: flour, water, salt, and a long cold proof.',
  },
  {
    id: 'note-train',
    text: 'Book the overnight train through the mountains before the snow season.',
  },
  {
    id: 'note-espresso',
    text: 'The office espresso machine needs a new gasket.',
  },
]

export const SAMPLE_IMAGES: SampleImage[] = [
  { id: 'img-dog', file: 'dog-beach.jpg', label: 'Dog on the beach' },
  { id: 'img-cat', file: 'cat-couch.jpg', label: 'Cat asleep on a couch' },
  { id: 'img-bike', file: 'bicycle-city.jpg', label: 'Red bicycle' },
  { id: 'img-fruit', file: 'fruit-bowl.jpg', label: 'Bowl of fruit' },
  { id: 'img-mountains', file: 'mountains.jpg', label: 'Snowy mountains' },
  { id: 'img-coffee', file: 'coffee-desk.jpg', label: 'Coffee on a desk' },
]

export function sampleImageUrl(file: string): string {
  return `${import.meta.env.BASE_URL}samples/${file}`
}
