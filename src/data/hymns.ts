export interface Hymn {
  id: number;
  number: number;
  title: string;
  author: string;
  firstLine: string;
  category: string;
  lyrics: string[];
  tune?: string;
  isFavorite?: boolean;
  musicSheetUrl?: string;
  addedAt?: number;
}

export const hymnsData: Hymn[] = [
  {
    id: 1,
    number: 1, // Will be recalculated alphabetically
    title: "Amazing Grace",
    author: "John Newton",
    firstLine: "Amazing grace, how sweet the sound",
    category: "Grace",
    lyrics: [
      "Amazing grace, how sweet the sound\nThat saved a wretch like me\nI once was lost, but now am found\nWas blind, but now I see",
      "'Twas grace that taught my heart to fear\nAnd grace my fears relieved\nHow precious did that grace appear\nThe hour I first believed",
      "Through many dangers, toils and snares\nI have already come\n'Tis grace hath brought me safe thus far\nAnd grace will lead me home"
    ],
    tune: "New Britain"
  },
  {
    id: 2,
    number: 2, // Will be recalculated alphabetically
    title: "How Great Thou Art",
    author: "Carl Boberg",
    firstLine: "O Lord my God, when I in awesome wonder",
    category: "Praise",
    lyrics: [
      "O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made\nI see the stars, I hear the rolling thunder\nThy power throughout the universe displayed",
      "Then sings my soul, my Savior God, to Thee\nHow great Thou art, how great Thou art\nThen sings my soul, my Savior God, to Thee\nHow great Thou art, how great Thou art"
    ],
    tune: "O Store Gud"
  },
  {
    id: 3,
    number: 3, // Will be recalculated alphabetically
    title: "Holy, Holy, Holy",
    author: "Reginald Heber",
    firstLine: "Holy, holy, holy! Lord God Almighty!",
    category: "Worship",
    lyrics: [
      "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee\nHoly, holy, holy! merciful and mighty!\nGod in three Persons, blessed Trinity!",
      "Holy, holy, holy! All the saints adore Thee\nCasting down their golden crowns around the glassy sea\nCherubim and seraphim falling down before Thee\nWhich wert, and art, and evermore shalt be"
    ],
    tune: "Nicaea"
  },
  {
    id: 4,
    number: 4, // Will be recalculated alphabetically
    title: "Be Thou My Vision",
    author: "Ancient Irish",
    firstLine: "Be Thou my vision, O Lord of my heart",
    category: "Guidance",
    lyrics: [
      "Be Thou my vision, O Lord of my heart\nNaught be all else to me, save that Thou art\nThou my best thought, by day or by night\nWaking or sleeping, Thy presence my light",
      "Be Thou my wisdom, and Thou my true word\nI ever with Thee and Thou with me, Lord\nThou my great Father, I Thy true son\nThou in me dwelling, and I with Thee one"
    ],
    tune: "Slane"
  },
  {
    id: 5,
    number: 5, // Will be recalculated alphabetically
    title: "It Is Well With My Soul",
    author: "Horatio G. Spafford",
    firstLine: "When peace, like a river, attendeth my way",
    category: "Peace",
    lyrics: [
      "When peace, like a river, attendeth my way\nWhen sorrows like sea billows roll\nWhatever my lot, Thou hast taught me to say\nIt is well, it is well with my soul",
      "It is well with my soul\nIt is well, it is well with my soul"
    ],
    tune: "Ville du Havre"
  },
  {
    id: 6,
    number: 6, // Will be recalculated alphabetically
    title: "Great Is Thy Faithfulness",
    author: "Thomas O. Chisholm",
    firstLine: "Great is Thy faithfulness, O God my Father",
    category: "Faithfulness",
    lyrics: [
      "Great is Thy faithfulness, O God my Father\nThere is no shadow of turning with Thee\nThou changest not, Thy compassions, they fail not\nAs Thou hast been, Thou forever will be",
      "Great is Thy faithfulness! Great is Thy faithfulness!\nMorning by morning new mercies I see\nAll I have needed Thy hand hath provided\nGreat is Thy faithfulness, Lord, unto me!"
    ],
    tune: "Faithfulness"
  },
  {
    id: 7,
    number: 7, // Will be recalculated alphabetically
    title: "Blessed Assurance",
    author: "Fanny J. Crosby",
    firstLine: "Blessed assurance, Jesus is mine!",
    category: "Assurance",
    lyrics: [
      "Blessed assurance, Jesus is mine!\nO what a foretaste of glory divine!\nHeir of salvation, purchase of God\nBorn of His Spirit, washed in His blood",
      "This is my story, this is my song\nPraising my Savior all the day long\nThis is my story, this is my song\nPraising my Savior all the day long"
    ],
    tune: "Assurance"
  },
  {
    id: 8,
    number: 8, // Will be recalculated alphabetically
    title: "The Old Rugged Cross",
    author: "George Bennard",
    firstLine: "On a hill far away stood an old rugged cross",
    category: "Salvation",
    lyrics: [
      "On a hill far away stood an old rugged cross\nThe emblem of suffering and shame\nAnd I love that old cross where the dearest and best\nFor a world of lost sinners was slain",
      "So I'll cherish the old rugged cross\nTill my trophies at last I lay down\nI will cling to the old rugged cross\nAnd exchange it some day for a crown"
    ],
    tune: "The Old Rugged Cross"
  }
];

export const categories = ["All", "Grace", "Praise", "Worship", "Guidance", "Peace", "Faithfulness", "Assurance", "Salvation"];