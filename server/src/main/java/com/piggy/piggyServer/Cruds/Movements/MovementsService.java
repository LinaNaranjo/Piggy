package com.piggy.piggyServer.Cruds.Movements;

import com.piggy.piggyServer.Cruds.user.UserEntity;
import com.piggy.piggyServer.Cruds.user.UserRepository;
import com.piggy.piggyServer.Cruds.user.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Service
public class MovementsService {
  @Autowired
  private MovementsRepository movementsRepository;
  private MovementsEntity income;

  @Autowired
  private UserService userService;
  @Autowired
  private UserRepository userRepository;

  public MovementsEntity createMovement(MovementsEntity movements, UserEntity user) {
    if (movements.getName() == null || movements.getName().isEmpty()){
      throw new IllegalArgumentException("Movement name cannot be null or empty");
    }
    if(movements.getAmount() == null || movements.getAmount() <= 0){
      throw new IllegalArgumentException("Movement amount must be greater than 0");
    }
    if (movements.getTotalAmount() == null) {
      movements.setTotalAmount(0.0);
    }
    movements.setUser(user);
    MovementsEntity savedMovement = movementsRepository.save(movements);
    userService.addPointsUser(user.getId(), 10);
    Double newTotal = calculateTotalForUser(user.getId());
    savedMovement.setTotalAmount(newTotal);
    UserEntity updatedUser = userRepository.findById(user.getId())
        .orElseThrow(() -> new IllegalArgumentException("User not found after update"));
    movements.setUser(updatedUser);
    return savedMovement;

  }

  public Double calculateTotalForUser(Integer userId) {
    List<MovementsEntity> movements = movementsRepository.findByUserId(userId);

    return movements.stream()
        .mapToDouble(movement ->
            movement.getType() == MovementType.INCOME
                ? movement.getAmount()
                : -movement.getAmount()
        )
        .sum();
  }

    //--------------------   --------------------

  public ResponseEntity<?> getMovementById(Long movementId) {
    if (!movementsRepository.existsById(movementId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Movement with ID " + movementId + "does not exist"
      ));
    }
    MovementsEntity movement = movementsRepository.findById(movementId).orElseThrow(null);
    return ResponseEntity.ok(movementId);
  }


  public ResponseEntity<?> getIncomesByUserId(Integer userId) {
    List<MovementsEntity> userMovements = movementsRepository.findByUserId(userId);

    if (userMovements.isEmpty()) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not found",
          "message", "No movements found for the user with ID " + userId
      ));
    }

    // Calcular el total acumulado
    double totalAmount = userMovements.stream()
        .mapToDouble(movement ->
            movement.getType() == MovementType.INCOME
                ? movement.getAmount()
                : -movement.getAmount()
        )
        .sum();

    // Actualizar el campo totalAmount en cada movimiento para la respuesta
    userMovements.forEach(movement -> movement.setTotalAmount(totalAmount));

    return ResponseEntity.ok(userMovements);
  }


  public MovementsEntity updateIncome(Long movementId, MovementsEntity updateMovement) {
    // Buscar el movimiento por su ID
    MovementsEntity movement = movementsRepository.findById(movementId)
        .orElseThrow(() -> new IllegalArgumentException("Movement not found"));

    // Actualizar los campos del movimiento si están presentes en la solicitud
    if (updateMovement.getName() != null && !updateMovement.getName().isEmpty()) {
      movement.setName(updateMovement.getName());
    }
    if (updateMovement.getDate() != null) {
      movement.setDate(updateMovement.getDate());
    }
    if (updateMovement.getAmount() != null && updateMovement.getAmount() > 0) {
      movement.setAmount(updateMovement.getAmount());
    }
    if (updateMovement.getType() != null) {
      movement.setType(updateMovement.getType());
    }

    // Guardar el movimiento actualizado
    MovementsEntity updatedMovement = movementsRepository.save(movement);

    // Recalcular el totalAmount para el usuario
    Double newTotalAmount = calculateTotalForUser(updatedMovement.getUser().getId());
    updatedMovement.setTotalAmount(newTotalAmount);
    return updatedMovement;
  }

  public ResponseEntity<?> deleteIncomeById(Long movementId) {
    // Verificar si el movimiento existe
    MovementsEntity movement = movementsRepository.findById(movementId)
        .orElseThrow(() -> new IllegalArgumentException("Movement with ID " + movementId + " does not exist"));

    // Obtener el ID del usuario asociado
    Integer userId = movement.getUser().getId();

    // Eliminar el movimiento
    movementsRepository.deleteById(movementId);

    // Recalcular el totalAmount para el usuario
    Double newTotalAmount = calculateTotalForUser(userId);

    return ResponseEntity.ok(Map.of(
        "Message", "Movement with ID " + movementId + " has been successfully deleted",
        "NewTotalAmount", newTotalAmount
    ));
  }
}
