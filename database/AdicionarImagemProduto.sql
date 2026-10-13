-- Executar manualmente no SSMS antes de iniciar o backend atualizado.
-- Os produtos existentes permanecem cadastrados, com imagem_url = NULL.
USE IronClubDB;
GO

IF COL_LENGTH('dbo.Produto', 'imagem_url') IS NULL
BEGIN
    ALTER TABLE dbo.Produto ADD imagem_url NVARCHAR(2048) NULL;
END;
GO
