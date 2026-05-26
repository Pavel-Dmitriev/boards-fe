/** Роли */
const enum Roles {
  /** Администратор */
  admin = "admin",
  /** Владелец комнаты */
  owner_room = "owner_room",
  /** Владелец доски */
  owner_board = "owner_board",
  /** Владелец карточки */
  owner_card = "owner_card",
  /** Участник комнаты */
  member_room = "member_room",
  /** Участник доски */
  member_board = "member_board",
  /** Участник карточки */
  member_card = "member_card",
}

export default Roles;
