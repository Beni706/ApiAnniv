-- CreateTable
CREATE TABLE "Organisateur" (
    "id_organisateur" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom_evenement" TEXT NOT NULL,
    "date_evenement" DATETIME NOT NULL,
    "lieu" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Participant" (
    "id_participant" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "id_organisateur" INTEGER NOT NULL,
    CONSTRAINT "Participant_id_organisateur_fkey" FOREIGN KEY ("id_organisateur") REFERENCES "Organisateur" ("id_organisateur") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisateur_email_key" ON "Organisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organisateur_password_key" ON "Organisateur"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");
