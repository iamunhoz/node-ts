import { PhraseType } from "@prisma/client"

type Phrase = {
  id: string
  body: string
  parentId: string
  phraseType: PhraseType // TODO levar esse type para o front
}

export type PlainSentence = {
  id: string
  phrases: Phrase[]
}

export const plainSentence: PlainSentence = {
  id: "model-2",
  phrases: [
    {
      id: "1",
      body: "this is a model sentence",
      parentId: "model-2",
      phraseType: "VerbP",
    },
    {
      id: "leftside-dxZ09f_at_jRZ01Ndo1ye",
      body: "this is a",
      parentId: "1",
      phraseType: "VerbP",
    },
    {
      id: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
      body: "model sentence",
      parentId: "1",
      phraseType: "VerbP",
    },
    {
      id: "leftside-ymPfhcQL60WtrWaQmdKF8",
      body: "this",
      parentId: "leftside-dxZ09f_at_jRZ01Ndo1ye",
      phraseType: "VerbP",
    },
    {
      id: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
      body: "is a",
      parentId: "leftside-dxZ09f_at_jRZ01Ndo1ye",
      phraseType: "VerbP",
    },
    {
      id: "leftside-uslfbRKSaoR1ybOrdqQuD",
      body: "is",
      parentId: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
      phraseType: "VerbP",
    },
    {
      id: "rightside-ehNqA7LOKMs4iWFkgNnZ3",
      body: "a",
      parentId: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
      phraseType: "VerbP",
    },
    {
      id: "leftside-UNuK9ndG3f2PfOPG87mmn",
      body: "model",
      parentId: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
      phraseType: "VerbP",
    },
    {
      id: "rightside-3cuUpI9APjHtgl9jJjDk2",
      body: "sentence",
      parentId: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
      phraseType: "VerbP",
    },
  ],
}
