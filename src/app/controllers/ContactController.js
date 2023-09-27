const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {

    async index(request, response) {
        const { orderBy } = request.query;
        const contacts = await ContactsRepository.findAll(orderBy);
        response.json(contacts);
    }


    async show(request, response) {
        const { id } = request.params;
        const contact = await ContactsRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ Error: 'User not found' });
        }

        response.json(contact);
    }


    async store(request, response) {
        const {
            name, email, phone, categoryId,
        } = request.body;

        if (!name) {
            return response.status(400).json({ error: 'Preencher o nome é obrigatório.' });
        }

        const contactExists = await ContactsRepository.findByEmail(email);

        if (contactExists) {
            return response.status(400).json({ error: 'Esse email já está em uso.' });
        }

        const contact = await ContactsRepository.create({
            name, email, phone, categoryId,
        });

        response.json(contact);
    }


    async uptade(request, response) {
        const { id } = request.params;
        const {
            name, email, phone, categoryId,
        } = request.body;

        const contactExists = await ContactsRepository.findById(id);

        if (!contactExists) {
            return response.status(404).json({ error: 'Usuário não encontrado.' });
        }

        if (!name) {
            return response.status(400).json({ error: 'Preencher o nome é obrigatório.' });
        }

        const contactByEmail = await ContactsRepository.findByEmail(email);

        if (contactByEmail && contactByEmail.id !== id) {
            return response.status(400).json({ error: 'Esse email já está em uso.' });
        }

        const contact = await ContactsRepository.update(id, {
            name, email, phone, categoryId,
        });

        response.json(contact);
    }


    async delete(request, response) {
        const { id } = request.params;

        await ContactsRepository.delete(id);
        response.sendStatus(204);
    }
}

module.exports = new ContactController();
