import type { CardStatusType } from "shared/types/CardStatusType";

export const STATUS: Record<CardStatusType, { label: string; className: string }> = {
  new: { label: "Новая", className: "bg-blue-500/10 text-blue-400" },
  in_progress: { label: "В работе", className: "bg-yellow-500/10 text-yellow-400" },
  done: { label: "Завершена", className: "bg-green-500/10 text-green-400" },
  rejected: { label: "Отклонена", className: "bg-red-500/10 text-red-400" },
};
