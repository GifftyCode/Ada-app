import { detectCrisis } from "./crisisDetect";

const crisis = [
  "I don't want to be alive anymore.",
  "I no wan live again, everything don spoil.",
  "Omo honestly, sometimes I just wish I can sleep and not wake up.",
  "I cut myself last night and I want to do it again.",
  "I took a lot of pills about an hour ago.",
  "My parents will be better off without me abeg",
  "I've started giving away my things because I won't need them anymore.",
  "Na spiritual attack, the voices dey tell me make I jump from the hostel.",
];
const notCrisis = [
  "This GST exam go kill me sha.",
  "I'm dying of hunger, the cafeteria has closed.",
  "Omo that lecturer's assignment wan finish me.",
  "I killed that presentation today!",
  "My CGPA dropped this semester and I feel disappointed.",
  "I dey miss my mama, I never go home since January.",
];

test.each(crisis)("flags crisis: %s", (t) => expect(detectCrisis(t)).toBe(true));
test.each(notCrisis)("does not flag idiom/everyday stress: %s", (t) =>
  expect(detectCrisis(t)).toBe(false),
);
